export function animation(selector: string, time = 0.03) {
  let count = time
  document.querySelectorAll(selector).forEach((x) => {
    const element = x as HTMLElement
    element.style.animation = 'animationlist .325s both'
    element.style.animationDelay = count + 's'
    count += time
  })
}
