   /* 
    防抖动函数
     */
export function debounce(func, delay = 100) {
  let timer = null
  return function (...args) {
    if(timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

/* 计算时间 */
export function formatDate(date){
  const newDate = new Date(date)
  const year =newDate.getFullYear()
  const month =(newDate.getMonth()+1).toString().padStart(2,0);
  const day =newDate.getDate().toString().padStart(2,0);
  return year+'-'+month+'-'+day
}