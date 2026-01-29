import BeforeUserTable from "@/components/BeforeUserTable";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const user = userEvent.setup();

describe("ユーザ一覧テスト", () => {
  beforeEach(() => {
    render(
      <BeforeUserTable
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
  test("フィルタリング機能テスト_name", async () => {
    await waitFor(() => {
      expect(screen.queryByText("ローディング中")).not.toBeInTheDocument();
    });
    const conditionField = await screen.findByLabelText("検索条件");

    await user.type(conditionField, "田中");
    const rows = screen.getAllByRole("row");

    await waitFor(() => {
      expect(screen.queryByText("田中さん")).toBeInTheDocument();
      expect(rows.length - 1).toBe(1);
    });
  });
});
