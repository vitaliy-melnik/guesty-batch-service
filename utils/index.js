function waitFor(milliseconds) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function handleRateLimits(promise) {
    const msToWait = 1000 * 10 // 10sec
    await waitFor(msToWait)
    return await promise();
}

function retry(promise, onRetry, maxRetries) {
    // Notice that we declare an inner function here
    // so we can encapsulate the retries and don't expose
    // it to the caller. This is also a recursive function
    async function retryWithBackoff(retries) {
        try {
            // Make sure we don't wait on the first attempt
            if (retries > 0) {
                // Here is where the magic happens.
                // on every retry, we exponentially increase the time to wait.
                // Here is how it looks for a `maxRetries` = 4
                // (2 ** 1) * 100 = 200 ms
                // (2 ** 2) * 100 = 400 ms
                // (2 ** 3) * 100 = 800 ms
                const timeToWait = 2 ** retries * 100;
                console.log(`waiting for ${timeToWait}ms...`);
                await waitFor(timeToWait);
            }

            return await promise();
        } catch (e) {
            // it should handle simple case of rate limit, and for scaling we need to use queue and change implementation
            if(e.statusCode === 429) {
                return await handleRateLimits(promise)
            }
            if (e.statusCode === 404) {
                throw e
            }
            // only retry if we didn't reach the limit
            // otherwise, let the caller handle the error
            if (retries < maxRetries) {
                onRetry();
                return retryWithBackoff(retries + 1);
            } else {
                console.warn("Max retries reached. Bubbling the error up");
                throw e;
            }
        }
    }

    return retryWithBackoff(0);
}

module.exports = {
    retry,
    waitFor
}