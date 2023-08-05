for(let i = 0 ; i < 10 ; i++) {
    if( i === 3) {
        console.log('it is 3');
        continue;
    }
    if( i == 5) {
        console.log('stop');
        break;
    }
    console.log(i);
}

const user = {
    name: 'h',
    province: 'a',
    city: 'b',
}

for(let x in user) {
    console.log(`${x} : ${user[x]}`);
}

let i = 0;
while (i < 10) {
    console.log(i);
    i++;
}

let ii = 100;
do {
    console.log(ii);
    ii++;
}
while(i < 10);

const locations = ['a', 'b', 'c', 'd'];

for(let i = 0 ; i < locations.length ; i++) {
    console.log(locations[i]);
}

// 1. for 에서는 break 가능, forEach 에서는 불가능
// 2. for 에서는 await 가능, forEach 에서는 불가능
// 3. for 이 일반적으로 forEach 보다 빠름
locations.forEach(function (location, index, array) {
    console.log(`${index}: ${location}`);
    console.log(array);
})

locations.map(function (location) {
    console.log(location);
})