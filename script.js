const cafeList = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form');



const renderCafe = (doc) => {

    // let li = document.createElement('li');
    // let name =document.createElement('span');
    // let city = document.createElement('span');
    
    // li.setAttribute('data-id',doc.id);
    // name.textContent = doc.data().name;
    // city.textContent = doc.data().city;
    

    // li.appendChild(name);
    // li.appendChild(city);
    // cafeList.appendChild(li);
    let html =`<li data-id="${doc.id}"><span class="cafe-name">${doc.data().name}</span><span class="cafe-name">${doc.data().city}</span><div class="x">x</div</li>`;
    cafeList.innerHTML += html;

};


// db.collection('cafes').get().then( snapshot => {
//     snapshot.docs.forEach( doc => {
//         renderCafe(doc);
//     })
// });

const deleteCafe = (id) => {
    const cafeIds =document.querySelectorAll('li');
    cafeIds.forEach(list => {
        if(list.getAttribute('data-id') === id){
            list.remove();
        }
    });

};

db.collection('cafes').onSnapshot(snapshot => {
    snapshot.docChanges().forEach( change => {
        const doc = change.doc;
        if(change.type === 'added'){
            renderCafe(doc);
        } else if(change.type === 'removed'){
            deleteCafe(doc.id);

        }
        
    });
})


form.addEventListener('submit',e => {
    e.preventDefault();
    const cafeData ={name: form.name.value,city: form.city.value};
    db.collection('cafes').add(cafeData).then(()=>{
        console.log('Data has been added to the database');
    }).catch(err => {console.log(err)});
    form.reset();
    


});

cafeList.addEventListener('click',e => {
    if(e.target.tagName === 'DIV') {
        const docId = e.target.parentElement.getAttribute('data-id');
        db.collection('cafes').doc(docId).delete().then(()=>{
            console.log('Cafe Deleted')
        }).catch(err => {console.log(err)});
    }
});