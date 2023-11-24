export const useContentParsers = () => {
    const parse_csv = (text:string) => {
        return text.split('\n').slice(1).map(entry => entry.split(',').map(i => i.replace('\r', '')));
    }

    return {parse_csv}
}