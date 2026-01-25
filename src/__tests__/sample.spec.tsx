import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BeforeUserTable from "@/components/BeforeUserTable";

// import { setupServer } from "msw/node";
// import { HttpResponse, http } from "msw";
// import { afterAll, afterEach, beforeAll, describe, test, expect } from "vitest";

// const server = setupServer(
//   http.get("https://jsonplaceholder.typicode.com/users", () => {
//     return HttpResponse.json([
//       {
//         id: 1,
//         name: "Leanne Graham",
//         username: "Bret",
//         email: "Sincere@april.biz",
//         address: {
//           street: "Kulas Light",
//           suite: "Apt. 556",
//           city: "Gwenborough",
//           zipcode: "92998-3874",
//           geo: {
//             lat: "-37.3159",
//             lng: "81.1496",
//           },
//         },
//         phone: "1-770-736-8031 x56442",
//         website: "hildegard.org",
//         company: {
//           name: "Romaguera-Crona",
//           catchPhrase: "Multi-layered client-server neural-net",
//           bs: "harness real-time e-markets",
//         },
//       },
//     ]);
//   }),
// );
// beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
// afterAll(() => server.close());
// afterEach(() => server.resetHandlers());

const user = userEvent.setup();

describe("UserTableフィルタリングテスト", () => {
  test("nameでフィルタリング", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");

    render(<BeforeUserTable />);

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(screen.queryByText("Ervin Howell")).not.toBeNull();
    });

    const conditionField = await screen.findByLabelText("検索条件");
    await user.type(conditionField, "Graham");

    await waitFor(() => {
      expect(screen.queryByText("Ervin Howell")).toBeNull();
    });

    // console.log("aaa", fetchSpy.mock.calls.length);
    // console.log("aaa", fetchSpy.mock.calls);

    // const fetchResult = await fetchSpy.mock.results[0].value;
    // console.log(fetchResult);

    // screen.debug();

    // await screen.findByText("Graham", {}, { timeout: 5000 });

    // await waitFor(() => {
    //   expect(screen.getByLabelText("検索条件")).toBeInTheDocument();
    // });

    // await waitFor(() => {
    //   expect(screen.getByText("Graham")).toBeInTheDocument();
    // });

    // const conditionField = await screen.findByLabelText("検索条件");

    // screen.debug();
    // await user.type(conditionField, "Graham");

    // console.log("=====================");

    // screen.debug();

    // console.log("1回目", screen.queryByText("Ervin Howell") === null);
    // console.log("2回目", screen.queryByText("Ervin Howell") === null);
    // console.log("3回目", screen.queryByText("Ervin Howell") === null);

    // const sut = screen.queryByText("Ervin Howell");
    // expect(sut).toBeNull();

    // await waitFor(() => {
    //   // expect(screen.queryByText("Leanne Graham")).toBeVisible();
    //   expect(screen.queryByText("Ervin Howell")).toBeNull();
    // });

    // await waitFor(() => {
    //   expect(screen.queryByText("Ervin Howell")).toBeNull();
    //   // console.log(screen.queryByText("Ervin Howell"));
    //   // expect(screen.queryByText("Leanne Graham")).toBeVisible();
    //   // expect(screen.queryByText("Ervin Howell")).not.toBeInTheDocument();
    // });

    // const sut = screen.queryByText("Ervin Howell");
    // expect(sut).toBeNull();

    // const sut1 = screen.queryByText("Leanne Graham");
    // expect(screen.queryByText("Leanne Graham")).toBeVisible();
    // expect(screen.queryByText("Ervin Howell")).toBeNull();

    // const sut = screen.queryByText("Ervin Howell");
    // expect(sut).toBeNull();

    // const sut1 = screen.queryByText("Leanne Graham");
    // expect(sut1).toBeVisible();

    // const sut = screen.queryByText("Ervin Howell");
    // expect(sut).toBeNull();

    // await waitFor(async () => {
    //   const sut = await screen.queryByText("Ervin Howell");
    //   expect(sut).toBeNull();
    // });

    // const sut = await screen.queryByText("Ervin Howell");
    // expect(sut).toBeNull();

    // await waitFor(() => {
    //   expect(screen.queryByText("Ervin Howell")).toBeNull();
    //   // console.log(screen.queryByText("Ervin Howell"));
    //   // expect(screen.queryByText("Leanne Graham")).toBeVisible();
    //   // expect(screen.queryByText("Ervin Howell")).not.toBeInTheDocument();
    // });
  });
});
