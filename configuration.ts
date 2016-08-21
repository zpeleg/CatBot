import * as fs from 'async-file'

interface ConfigTokenSection {
    [key: string]: string
}

export class Configuration {
    private data: ConfigTokenSection
    public async init() {
        var content: string = await fs.readFile('tokens.json', 'utf8');
        this.data = JSON.parse(content);
    }
    public getKey(key: string):string {
        return this.data[key]; 
    }
}