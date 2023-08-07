function fetchData() {
    return new Promise(function(resolve, reject) {
            const sucess = true;
            if(sucess) {
                resolve('success');
            }
            else {
                reject('error');
            }
        }
    );
}


fetchData()
    .then(function(data) {
        console.log(data);
    })
    .catch(function(error){
        console.log(error);
    }
);

fetch('http://jsonplaceholder.typicode.com/todos/1')
.then(response => response.json())
.then(data1 => console.log(data1))
.then(() => fetch('http://jsonplaceholder.typicode.com/todos/2'))
.then(response => response.json())
.then(data2 => console.log(data2))
.catch(error => console.log(error))
.finally(() => console.log('finally'));

// promise.all([1, 2, 3, 4,]) 4개 모두 resolve되고 나서 반환된다. (하나라도 에러나면 에러)
// promise.race([1, 2, 3, 4,]) 가장 빠른 1개만 resolve되도 반환한다. (하나라도 에러나면 에러)

async function fetchData2() {
    try {
        const res1 = await fetch('http://jsonplaceholder.typicode.com/todos/1');
        console.log(await res1.json());
        const res2 = await fetch('http://jsonplaceholder.typicode.com/todos/2');
        console.log(await res2.json());
    }
    catch(error) {
        console.log(error);
    }
    finally {
        console.log('finally');
    }
}

fetchData2();

// javascript는 synchronouse 언어 (싱글 스레드)
// settimeout은 브라우저의 경우 winodw 객체에서 node의 경우 golbal 객체에서 제공해 주는 것을 사용한다.
// 프로세서 하나에 스레드 하나 / 프로세스 안에 스레드 하나 (싱글 스레드 프로세스) / 프로세스 안에 스레드 여러개 (멀티 스레드 프로세스)
// 각 스레드는 각 레지스터, 스택 영역을 가진다.
// 여러 스레드가 자원을 공유 (싱글 프로세서 멀티스레딩) / 여러 스레드가 자원(데이터와 힙 영역) 공유하지 않음 (멀티 프로세싱)