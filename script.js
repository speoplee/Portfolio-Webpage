document.addEventListener('DOMContentLoaded', () => {
 const Panel = document.querySelector('.panel');
 const BgWords = document.querySelector('.bg-words');

 if (Panel && BgWords) {
   Panel.addEventListener('mousemove', e => {
     const Rect = Panel.getBoundingClientRect();
     const Px = (e.clientX - Rect.left) / Rect.width - 0.5;
     const Py = (e.clientY - Rect.top) / Rect.height - 0.5;
     BgWords.style.transform = `translate3d(${Px * 30}px, ${Py * 14}px, 0) scale(1.02)`;
   });
 }

 requestAnimationFrame(() => {
   Panel.style.opacity = 0;
   Panel.style.transform = 'translateY(8px) scale(.996)';
   setTimeout(() => {
     Panel.style.transition = 'opacity .6s ease, transform .6s cubic-bezier(.2,.9,.2,1)';
     Panel.style.opacity = 1;
     Panel.style.transform = '';
   }, 60);
 });

 const Track = document.querySelector('.carousel-track');
 const Items = Array.from(Track.children);
 const Viewport = document.querySelector('.carousel-viewport');
 const BtnNext = document.querySelector('.carousel-btn.next');
 const BtnPrev = document.querySelector('.carousel-btn.prev');
 let CenterIdx = 1;

 function UpdateCarousel() {
   const ViewportWidth = Viewport.offsetWidth;
   const TrackWidth = Track.scrollWidth;
   const ItemWidth = Items[CenterIdx].offsetWidth;

   const ItemCenter = Items.slice(0, CenterIdx)
     .reduce((Sum, El) => Sum + El.offsetWidth, 0) + ItemWidth / 2;

   let TranslateX = ViewportWidth / 2 - ItemCenter;
   TranslateX = Math.min(0, TranslateX);
   TranslateX = Math.max(ViewportWidth - TrackWidth, TranslateX);

   Track.style.transition = 'transform 420ms cubic-bezier(.2,.9,.2,1)';
   Track.style.transform = `translateX(${TranslateX}px)`;

   Items.forEach((Item, Index) => {
     Item.classList.remove('IsActive');
     const Video = Item.querySelector('video');
     if (Video) {
       if (Index === CenterIdx) Video.play().catch(() => {});
       else { Video.pause(); Video.currentTime = 0; }
     }
   });
   Items[CenterIdx].classList.add('IsActive');
 }

 BtnNext.addEventListener('click', () => {
   if (CenterIdx < Items.length - 1) {
     CenterIdx++;
     UpdateCarousel();
   }
 });

 BtnPrev.addEventListener('click', () => {
   if (CenterIdx > 0) {
     CenterIdx--;
     UpdateCarousel();
   }
 });

 Viewport.addEventListener('keydown', e => {
   if (e.key === 'ArrowLeft') BtnPrev.click();
   if (e.key === 'ArrowRight') BtnNext.click();
 });

 UpdateCarousel();
 window.addEventListener('resize', UpdateCarousel);
});
