export const useContentHandlers = () =>{
    const handle_image = (file:File) => {
        return new Promise(resolve => {
            const reader = new FileReader();

            reader.readAsDataURL(file);
            reader.onload = event => resolve(event.target.result);
        });
    }

    const handle_text = (file:File) => {
        return file.text();
    }

    const handle_ansi = (file:File) =>{
        return new Promise((resolve, reject) =>{
            const reader = new FileReader()
            reader.onload = (e) => {
                resolve(e.target.result)
            }
            reader.onerror = (e) =>{
                reject(new Error("Failed to read file."))
            }
            reader.readAsText(file,'windows-1252')
        })
    }

    return {handle_image, handle_text, handle_ansi}
}