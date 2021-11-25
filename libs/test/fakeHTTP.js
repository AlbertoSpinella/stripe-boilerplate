const fake = app => {
    const http = method => (url, { body, headers, querystring }) => {
        const options = { method, url };
    
        if(body) options.body = body;
        if(headers) options.headers = headers;
        if(querystring) options.query = querystring;
    
        return app.inject(options);
    };

    const methods = {};
    
    ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"]
        .map( method => methods[method] = http(method));

    return methods;
};

export {
    fake
};