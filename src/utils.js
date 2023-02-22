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

export function parse_csv(text) {
    return text.split('\n').slice(1).map(entry => entry.split(',').map(i => i.replace('\r', ''))); 
}