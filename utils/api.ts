export class ApiHandler {
  private static notHandleLoadingList: RegExp[] = [];

  static isApiWithoutLoading(url: string): boolean {
    return this.notHandleLoadingList.some((item) => item.test(url));
  }
}
