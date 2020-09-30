const apiURL = 'https://localhost:44301/api';

export default class BenefitService {
    public static programs: any[] = [];
    public static selectedProgram: null

    public static returnSelected() {
        return this.selectedProgram;
    }

    public static returnPrograms() {
        return this.programs;
    }


    public static saveCurrentProgram(id: any) {
        console.log(id)
        localStorage.setItem('currentProgram',id.toString());
    }

    public static forgetCurrentProgram() {
        localStorage.setItem('currentProgram', '0')
    }


    public static switchBenefit(id: any){
        return new Promise((resolve,reject)=>{
            fetch('https://localhost:44301/api/benefits/changestate',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(id) 
        }
            ).then(res=>resolve())
            .catch(err => reject(err))
        }

        )
    }


    public static assignProgram(id: number) {
        this.programs.forEach(a => {
            if (a.id === id) {
                this.selectedProgram = a;
                console.log(a.id, id)
            }
        });
        console.log(this.selectedProgram);
    }


    public static getBenefits(id: any) {
        return new Promise((resolve, reject) => {
            fetch('https://localhost:44301/api/benefits/'+id)
                .then(res => res.json())
                .then((benefits: any) => {
                    this.programs = benefits;
                    const finalBenefits = [];
                    const active: any[] = [];
                    const inactive: any[] = [];
                    benefits.forEach((b: any, key: any) => {
                        if (b.active === 0) {
                            inactive.push(b);
                        } else {
                            active.push(b);
                        }
                    })
                    finalBenefits.push(active);
                    finalBenefits.push(inactive);
                    resolve(finalBenefits);
                })
                .catch(err => reject(err));
        })
    }

    public static createProgram(name: string, description: string, url: string, areaId: number) {
        return new Promise((resolve, reject) => {
            fetch('https://localhost:44301/api/benefits/create', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Name: name,
                    Description: description,
                    Url: url,
                    AreaId: areaId
                })
            })
            .then(res => resolve())
            .catch(err => reject(err))
        })
    }

    public static deleteProgram(id: number) {
        return new Promise((resolve, reject) => {
            fetch('https://localhost:44301/api/benefits/delete', {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(id)
            })
            .then(res => resolve())
            .catch(err => reject(err))
        })
    }
}