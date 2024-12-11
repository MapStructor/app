const mobileCheckRegExp = /Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone|IEMobile|Opera Mini/i

// detecting mobile device
if (
  mobileCheckRegExp.test(
    navigator.userAgent
  )
) {
  // true for mobile device
  console.warn("mobile device");
  console.warn("load");
  console.warn("start");
} else {
  // false for not mobile device
  console.warn("not mobile device");
  if (window.innerWidth <= 670) {
    console.warn("but small size");
    console.warn("load");
    console.warn("start");
  } else {
    console.warn("redirect");
    window.location.href = "./index.html";
  }
}
