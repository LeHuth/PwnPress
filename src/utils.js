export function handle_image(file) {
    return new Promise(resolve => {
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = event => resolve(event.target.result);
    });
}

export function handle_text(file) {
    return file.text();
}
// destinations.csv ist not formatted in utf-8 -> cannot read ä,ö,ü
// when
export function handle_ansi(file){
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

export function parse_csv(text) {
    return text.split('\n').slice(1).map(entry => entry.split(',').map(i => i.replace('\r', ''))); 
}