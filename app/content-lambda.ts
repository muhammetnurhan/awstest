exports.handler = async (event: any = {}): Promise<any> => {
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: 'hello world',
            input: event,
        }),
    };
    return response;
}