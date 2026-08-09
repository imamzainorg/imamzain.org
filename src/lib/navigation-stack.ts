const STACK_KEY = "bookNavigationStack";

export function pushBookToStack(bookUrl: string) {
  const raw = sessionStorage.getItem(STACK_KEY);
  const stack: string[] = raw ? JSON.parse(raw) : [];

  // لو نفس الكتاب متكرر (مثلاً refresh) ما نضيفه مرتين
  if (stack[stack.length - 1] !== bookUrl) {
    stack.push(bookUrl);
    sessionStorage.setItem(STACK_KEY, JSON.stringify(stack));
  }
}

export function popAndGetPrevious(): string | null {
  const raw = sessionStorage.getItem(STACK_KEY);
  const stack: string[] = raw ? JSON.parse(raw) : [];

  // نشيل الكتاب الحالي (آخر عنصر)
  stack.pop();
  sessionStorage.setItem(STACK_KEY, JSON.stringify(stack));

  // نرجع الكتاب اللي قبله إن وجد
  return stack.length > 0 ? stack[stack.length - 1] : null;
}