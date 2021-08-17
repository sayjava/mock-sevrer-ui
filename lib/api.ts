const MOCK_SERVER_URL = `${process.env.NEXT_PUBLIC_MOCK_SERVER_ENDPOINT}`

export interface Expectation {
    id?: string
    priority?: number
    httpRequest: {
        path: string
        method?: string
        pathParameters?: any
        queryStringParameters?: any
        cookies?: any
        headers?: any
        body?: any
    }
    httpResponse: {
        statusCode?: number
        headers?: any
        body?: any
        cookies?: any
        delay?: number
        connectionOptions?: any
    }
    times?: {
        unlimited: boolean
        remainingTimes: number
    }
    timeToLive?: {
        unlimited: boolean
    }
}

export const expectation = {
    create: async (exp: Expectation) => {
        const res = await fetch(`${MOCK_SERVER_URL}/expectation`, {
            method: 'PUT',
            body: JSON.stringify(exp),
        })

        if (res.ok) {
            return true
        } else {
            const body = await res.text()
            throw Error(body)
        }
    },

    delete: async (exp: Expectation) => {
        const res = await fetch(`${MOCK_SERVER_URL}/clear`, {
            method: 'PUT',
            body: JSON.stringify({
                id: exp.id,
            }),
        })

        if (res.ok) {
            return true
        } else {
            const text = await res.text()
            throw Error(text)
        }
    },

    update: async (exp: Expectation) => {
        try {
            await expectation.delete(exp)
        } catch (error) {
            console.error(error)
        } finally {
            return expectation.create(exp)
        }
    },

    load: async () => {
        const res = await fetch(
            `${MOCK_SERVER_URL}/retrieve?type=active_expectations`,
            {
                method: 'PUT',
            }
        )

        if (res.ok) {
            const expectations = await res.json()
            return expectations
        } else {
            throw Error(`Error - ${res.statusText}`)
        }
    },

    batchCreate: async (exps: Array<Expectation>) => {
        const prs = exps.map(async (exp) => {
            if (exp.id) {
                try {
                    await expectation.delete(exp)
                } catch (error) {
                    console.error(error)
                } finally {
                    await expectation.create(exp)
                }
            } else {
                await expectation.create(exp)
            }
        })

        return Promise.all(prs)
    },

    reset: async () => {
        const res = await fetch(`${MOCK_SERVER_URL}/reset`, {
            method: 'PUT',
        })

        if (res.ok) {
            return true
        } else {
            const body = await res.text()
            throw Error(body)
        }
    },
}
