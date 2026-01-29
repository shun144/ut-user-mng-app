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
            name: "田中太郎",
            email: "tanaka@april.biz",
            phone: "1-770-736-8031 x56442",
            website: "hildegard.org",
          },
          {
            id: 2,
            name: "田中花子",
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
    const keywordField = await screen.findByLabelText("検索条件");
    await user.type(keywordField, "田中");

    const sut = await screen.findAllByText("田中");
    const table = await screen.findByRole("table");

    await waitFor(() => {
      // レコード値チェック
      expect(table).toHaveTextContent("田中太郎");
      expect(table).toHaveTextContent("田中花子");

      // レコード数チェック
      expect(screen.getAllByRole("row").length - 1).toBe(2);

      // ハイライトチェック
      sut.forEach((x) =>
        expect(x).toHaveAttribute("style", "background:#FFB3BF;"),
      );
    });
  });
});
