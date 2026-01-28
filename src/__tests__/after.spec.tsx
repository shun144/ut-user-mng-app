import AfterUserTable from "@/components/AfterUserTable";
import { Users } from "@/domains/Users";
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const user = userEvent.setup();

describe("UserTableフィルタリングテスト", () => {
  beforeEach(() => {
    act(() => {
      render(
        <AfterUserTable
          initialUsers={[
            {
              id: 1,
              name: "田中さん",
              email: "tanaka@april.biz",
              phone: "1-770-736-8031 x56442",
              website: "hildegard.org",
            },
          ]}
        />,
      );
    });
  });

  test("フィルタリング条件あり_表示テスト", async () => {
    const spy = vi.spyOn(Users.prototype, "filterUsers").mockReturnValue([
      {
        id: 1,
        name: "鈴木さん",
        email: "suzuki@april.biz",
        phone: "1-770-736-8031 x56442",
        website: "hildegard.org",
      },
    ]);

    await waitFor(() => {
      expect(screen.queryByText("ローディング中")).not.toBeInTheDocument();
    });
    const conditionField = await screen.findByLabelText("検索条件");
    await user.type(conditionField, "a");
    expect(spy).toHaveBeenCalledTimes(1);

    await waitFor(() => {
      expect(screen.queryByText("鈴木さん")).toBeInTheDocument();
      expect(screen.queryAllByRole("row").length).toBe(2);
    });
  });
});
