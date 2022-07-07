const trigger1 = document.getElementById('trigger1-btn');
const trigger2 = document.getElementById('trigger2-btn');
const modal1 = document.getElementById('modal1');
const modal2 = document.getElementById('modal2');
// const closeModal = document.getElementsById('modal-close')[0];

trigger1?.addEventListener('click', () => {
  modal1.style.display = 'block';
  console.log(`clicked`);
});
trigger2?.addEventListener('click', () => {
  modal2.style.display = 'block';
  console.log(`clicked`);
});

// window.addEventListener('click', (e) => {
//     if (e.target.classList = "modal-background") {
//        modal1.style.display = 'none';
//     }

// //     if (e.target.classList = "modal-background") {
// //         modal2.style.display = 'none';
// //     }
// })
