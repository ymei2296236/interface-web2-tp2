class App 
{
    /**
     * Retourne la promesse de la fonction asynchrone
     * @param {Url} url 
     * @param {Object} option 
     * @returns 
     */
    async appelFetch(url, option)
    {
        try 
        {
            let response = await fetch(url, option);

            if (response.ok) 
            {   
                const contentType = response.headers.get("content-type");

                if (contentType && contentType.indexOf("application/json") !== -1) return response.json();
                else return response.text();
            }
            else throw new Error('La réponse n\'est pas OK');
        } 
        catch (error) 
        {
            return error.message;
        }
    };
}

export const { appelFetch } = new App();