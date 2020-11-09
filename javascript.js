const classOptions =document.querySelector('.classOptions');
const classes = document.querySelectorAll('.classcontainer .classb:not(.taken)');
const count =document.getElementById('count');
const total =document.getElementById('total');
const planSelect =document.getElementById('plan');

populateUI();

// + added to covert typeof into num
let planPrice = +planSelect.value;

//Save selected plan index and price
function setPlanData(planIndex, planPrice){
    localStorage.setItem('selectedPlanIndex', planIndex);
    localStorage.setItem('slectedPlanPrice', planPrice);
}

//Upadate total and count
function updateSelectedCount(){
const selectedClasses = document.querySelectorAll('.classcontainer .classb.selected');

const classesIndex =[...selectedClasses].map(classb =>[...classes].indexOf(classb));

//Local storage
localStorage.setItem('selectedClasses', JSON.stringify(classesIndex));


const selectedClassesCount = selectedClasses.length;

count.innerText =selectedClassesCount;
total.innerText =selectedClassesCount * planPrice;
}

// Get data from localstorage and populate UI
function populateUI(){
    const selectedClasses =JSON.parse(localStorage.getItem('selectedClasses'));
     if(selectedClasses !== null && selectedClasses.length > 0){
         classes.forEach((classb,index)=>{
             if(selectedClasses.indexOf(index) > -1){
                 classb.classList.add('selected');

             }
         });
     }
     const planSelectIndex =localStorage.getItem('planSelectIndex');

     if(planSelectIndex !==null) {
         planSelect.SelectedIndex =planSelectIndex;
     }
}

//plan select event
planSelect.addEventListener('change',e =>{
    planPrice = +e.target.value;
    setPlanData(e.target.SelectedIndex, e.target.value);
    updateSelectedCount();
});


//plans click event
classOptions.addEventListener('click', e => {
    if(e.target.classList.contains('classb') &&
    !e.target.classList.contains('taken')
    ){
        e.target.classList.toggle('selected');

        updateSelectedCount();
    }
});


//Intial count and total set
updateSelectedCount();