import { Users } from "@/domains/Users";

describe("フィルタリング機能", () => {
  const users = new Users([
    {
      id: 1,
      name: "田中太郎",
      email: "tanakataro@april.biz",
      phone: "123-456-789",
      website: "taro.org",
    },
    {
      id: 2,
      name: "田中花子",
      email: "tanakahanako@april.biz",
      phone: "123-456-780",
      website: "hanako.org",
    },
  ]);

  test("フィルタリング機能_name", () => {
    const sut = users.filterUsers("田中");
    expect(sut.length).toBe(2);
  });

  // フィルタリング機能_email
  // フィルタリング機能_phone
  // フィルタリング機能_website
});
