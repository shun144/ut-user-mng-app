import AfterUserTable from "@/components/AfterUserTable";
import { Users } from "@/domains/Users";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const user = userEvent.setup();

describe("ユーザ一覧テスト", () => {
  const filterUsersSpy = vi.spyOn(Users.prototype, "filterUsers");
  beforeEach(() => {
    render(<AfterUserTable initialUsers={[]} />);
    filterUsersSpy.mockClear();
  });

  test("フィルタリング機能テスト_データあり", async () => {
    filterUsersSpy.mockReturnValue([
      {
        id: 1,
        name: "田中さん",
        email: "tanaka@april.biz",
        phone: "1-770-736-8031 x56442",
        website: "hildegard.org",
      },
    ]);

    await waitFor(() => {
      expect(screen.queryByText("ローディング中")).not.toBeInTheDocument();
    });

    const conditionField = await screen.findByLabelText("検索条件");

    await user.type(conditionField, "a");
    const rows = screen.getAllByRole("row");

    await waitFor(() => {
      expect(filterUsersSpy).toHaveBeenCalledTimes(1);
      expect(screen.queryByText("田中さん")).toBeInTheDocument();
      expect(rows.length - 1).toBe(1);
    });
  });

  test("フィルタリング機能テスト_データなし", async () => {
    filterUsersSpy.mockReturnValue([]);
    await waitFor(() => {
      expect(screen.queryByText("ローディング中")).not.toBeInTheDocument();
    });

    const conditionField = await screen.findByLabelText("検索条件");

    await user.type(conditionField, "a");
    const rows = screen.getAllByRole("row");

    await waitFor(() => {
      expect(filterUsersSpy).toHaveBeenCalledTimes(1);
      expect(screen.queryByText("田中さん")).not.toBeInTheDocument();
      expect(rows.length - 1).toBe(0);
    });
  });
});
