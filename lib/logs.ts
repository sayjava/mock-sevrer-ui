export interface EntryStore {
    logs?: Array<any>
    connected?: boolean
    error?: null
}

export interface Log {
    id?: string
    key?: string
    timestamp: string
    request: {
        path: string
        method: string
        headers: any
        pathParameters: any
        cookies: any
        queryStringParameters: any
        query: any
        body: any
    }
    expectation?: {
        id: string
        httpResponse: {
            statusCode: number
            headers?: any
            body: any
        }
        httpRequest: {
            headers: any
            body?: any
        }
    }
    proxy?: {
        statusCode: number
        body: any
        headers: any
    }
}

const extractRequest = (values: Array<any>) => {
    const request = values.find((val) => {
        return (
            val.value.description.includes('RECEIVED_REQUEST') ||
            val.value.description.includes('FORWARDED_REQUEST')
        )
    })

    const matched = request.value.messageParts.find(
        (part) => part.value.headers
    )
    return Object.assign({}, matched.value, {
        forwarded: !!values.find((val) =>
            val.value.description.includes('FORWARDED_REQUEST')
        ),
    })
}

const extractExpectation = (values: Array<any>) => {
    const expectation = values.find((val) => {
        return val.value.description.includes('EXPECTATION_MATCHED')
    })

    if (!expectation) {
        return null
    }

    const matched = expectation.value.messageParts.find((part) => part.value.id)
    return matched.value
}

const extractTimeStamp = (log: any) => {
    const {
        group: { value },
    } = log
    const [time] =
        value.description.match(/\d{2}-\d{2} \d{2}:\d{2}:\d{2}\.\d{3}/) || []
    return time
}

const createRequestResponse = (logs: Array<any>): Array<any> => {
    const acceptable = [
        'NO_MATCH_RESPONSE',
        'EXPECTATION_RESPONSE',
        'FORWARDED_REQUEST',
    ]

    const requests = logs
        .filter(({ group }) => {
            return acceptable.some((desc) =>
                group?.value?.description.includes(desc)
            )
        })
        .map((log) => {
            const { value } = log
            const timestamp = extractTimeStamp(log)
            const request = extractRequest(value)
            const expectation = extractExpectation(value)

            return {
                timestamp,
                request,
                expectation,
            }
        })

    return requests
}

const getProxyRequest = ({ request, proxies }) => {
    const proxied = proxies.find((proxy) => {
        const methodMatches = proxy.value.method === request.method
        const pathMatches = proxy.value.path === request.path
        return methodMatches && pathMatches
    })
    if (proxied) {
        return proxied.value
    }
    return null
}

export const mapToLogs = ({
    proxiedRequests = [],
    logMessages = [],
}): Array<Log> => {
    const logs: Array<Log> = createRequestResponse(logMessages).map(
        (entry, i) => {
            const proxy = getProxyRequest({
                request: entry.request,
                proxies: proxiedRequests,
            })
            if (proxy) {
                return Object.assign(
                    { id: `index-${i}`, key: `index-${i}` },
                    entry,
                    {
                        proxy: proxy.httpResponse,
                        request: proxy.httpRequest,
                    }
                )
            }
            return Object.assign({ id: `index-${i}`, key: `index-${i}` }, entry)
        }
    )

    return logs
}
