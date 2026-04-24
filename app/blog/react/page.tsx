import Image from "next/image";
import type { ReactNode } from "react";
import CodeBlock from "@/components/blog/CodeBlock";

function SectionTitle({ children }: { children: ReactNode }) {
  return <h2 className="mt-12 mb-4 text-3xl font-semibold text-foreground">{children}</h2>;
}

export default function ReactBlogPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 text-foreground [&_li_code]:rounded [&_li_code]:bg-muted [&_li_code]:px-1 [&_li_code]:py-0.5 [&_li_code]:text-foreground [&_p_code]:rounded [&_p_code]:bg-muted [&_p_code]:px-1 [&_p_code]:py-0.5 [&_p_code]:text-foreground">
      <h1 className="mb-2 text-5xl font-bold tracking-tight text-foreground">Complete Guide to React Hooks</h1>
      <p className="mb-10 text-muted-foreground">Interview-focused notes with practical code examples.</p>

      <SectionTitle>What are components in React?</SectionTitle>
      <p>A component is a JavaScript function that returns JSX.</p>

      <SectionTitle>What are hooks?</SectionTitle>
      <p>Hooks are special functions that give power (state, effects) to React function components.</p>

      <SectionTitle>Props</SectionTitle>
      <p>
        Props (short for properties) are read-only values passed from a parent component to a child
        component.
      </p>

      <SectionTitle>useState</SectionTitle>
      <p className="mb-4">
        <code>useState</code> is used to store and manage data inside a component. When state is
        updated, React re-renders the component and updates the UI.
      </p>
      <CodeBlock code={`const [state, setState] = useState(initialValue);`} />
      <ul className="mt-4 list-disc space-y-2 pl-6">
        <li>State updates are asynchronous and may be batched.</li>
        <li>When updating objects/arrays, create a new reference.</li>
        <li>The setter accepts either a value or callback function.</li>
      </ul>

      <SectionTitle>Virtual DOM, Diffing, and Reconciliation</SectionTitle>
      <ul className="list-disc space-y-2 pl-6">
        <li>React creates a new virtual DOM after state/props updates.</li>
        <li>Diffing compares old and new virtual DOM trees.</li>
        <li>Reconciliation updates only changed parts in the real DOM.</li>
        <li>
          <code>key</code> helps React identify list items that changed, were added, or removed.
        </li>
      </ul>

      <SectionTitle>useEffect</SectionTitle>
      <p className="mb-4">
        <code>useEffect</code> runs side effects like API calls, event listeners, DOM updates, and
        subscriptions.
      </p>
      <CodeBlock
        code={`import { useEffect } from "react";

function App() {
  useEffect(() => {
    function handleResize() {
      console.log("Window resized");
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <h1>Resize the window</h1>;
}`}
      />

      <SectionTitle>useRef</SectionTitle>
      <ul className="list-disc space-y-2 pl-6">
        <li>Persist mutable values across re-renders without causing re-render.</li>
        <li>Directly access DOM elements (focus, scroll, measure).</li>
        <li>The reference remains stable between renders.</li>
      </ul>

      <SectionTitle>Fragments</SectionTitle>
      <p>Fragments let you return multiple elements without adding extra DOM nodes.</p>

      <SectionTitle>Lifting State Up</SectionTitle>
      <p className="mb-4">
        Move shared state to the nearest common parent so multiple children can use and update it.
      </p>
      <CodeBlock
        code={`function Parent() {
  const [count, setCount] = useState(0);

  return (
    <>
      <ChildA onIncrement={() => setCount((c) => c + 1)} />
      <ChildB onDecrement={() => setCount((c) => c - 1)} />
      <p>Count: {count}</p>
    </>
  );
}`}
      />

      <SectionTitle>useMemo and useCallback</SectionTitle>
      <ul className="list-disc space-y-2 pl-6">
        <li>
          <code>useMemo</code> caches expensive computed values and recalculates only when
          dependencies change.
        </li>
        <li>
          <code>useCallback</code> memoizes a function to avoid unnecessary re-creations and child
          re-renders.
        </li>
      </ul>

      <SectionTitle>useContext</SectionTitle>
      <p>
        <code>useContext</code> avoids prop drilling by sharing global-like data without passing
        props at every level.
      </p>

      <SectionTitle>Redux Interview Notes</SectionTitle>
      <ul className="list-disc space-y-2 pl-6">
        <li>Redux keeps complex shared state in one global store.</li>
        <li>State changes are predictable via actions and reducers.</li>
        <li>Great for scaling large apps and debugging with DevTools.</li>
      </ul>
      <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card p-3">
        <Image
          src="/Redux.png"
          alt="Redux flow diagram"
          width={1600}
          height={900}
          className="h-auto w-full rounded-xl"
          priority
        />
      </div>
      <p className="mt-2 text-sm text-muted-foreground">
        Put your provided Redux image in <code>public/Redux.png</code> to show it here.
      </p>

      <SectionTitle>Redux Core Principles</SectionTitle>
      <ol className="list-decimal space-y-2 pl-6">
        <li>Single source of truth: one store for app state.</li>
        <li>State is read-only: change only through actions.</li>
        <li>Reducers are pure functions that return new state.</li>
      </ol>

      <SectionTitle>createAsyncThunk</SectionTitle>
      <p className="mb-4">
        <code>createAsyncThunk</code> handles API calls in Redux with loading, success, and error
        states.
      </p>
      <CodeBlock
        code={`import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk("users/fetch", async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  return res.json();
});

const usersSlice = createSlice({
  name: "users",
  initialState: { items: [], loading: false, error: null as string | null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch users";
      });
  },
});`}
      />
    </article>
  );
}
