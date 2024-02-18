export function render(title: string, content: string) {
  document.title = title;
  document.getElementById("app")!.innerHTML = content;
}
