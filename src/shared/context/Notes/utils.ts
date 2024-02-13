export const debounce = <F extends (...args: Parameters<F>) => ReturnType<F>>(fn: F, ms: number) => {
  let timeout: ReturnType<typeof setTimeout>

  return (...args: Parameters<F>) => new Promise(resolve => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      resolve(fn(...args))
    }, ms)
  })
}