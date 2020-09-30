const apiURL = 'https://localhost:44301/api';

export class AreaService {
    public static areas: any[] = [];
    public static selectedArea: null

    public static returnSelected() {
        return this.selectedArea;
    }

    public static returnAreas() {
        return this.areas;
    }

    public static getAreas() {
        return new Promise((resolve, reject) => {
            fetch( apiURL + '/areas')
                .then((res: any) => {
                    if (res.status === 200) {
                        return res.json();
                    }
                    return res.json();
                })
                .then(result => {
                    const edited: any = [];
                    result.forEach((r: any) => {
                        let name = r.name.toLowerCase().split(' ');
                        name = name.join('-');
                        const path = '/areas/' + name;
                        r['path'] = path;
                        edited.push(r);
                    })
                    this.areas = edited;
                    resolve(edited);
                })
                .catch(err => console.log(err));
        })
    }  

    public static assignArea(id: number) {
        console.log(id)
        this.areas.forEach(a => {
            if (a.id === id) {
                this.selectedArea = a;
                console.log(a.id, id)
            }
        });
    }

    public static removeArea( id : number){
        return fetch(apiURL + '/areas/'+id ,{method: 'DELETE'})
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }

    public static saveCurrentArea(id: number, path: string) {
        localStorage.setItem('currentArea', id.toString());
        localStorage.setItem('currentAreaPath', path);
    }

    public static forgetCurrentArea() {
        localStorage.setItem('currentArea', '0')
        localStorage.setItem('currentAreaPath', '/');
    }
}