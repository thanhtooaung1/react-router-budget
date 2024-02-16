import React, { useEffect, useRef } from "react";

// rrd imports
import { Form, useFetcher } from "react-router-dom";

// library
import { CurrencyDollarIcon } from "@heroicons/react/24/solid";

const AddBudgetForm = () => {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";

  const formRef = useRef();
  const nameRef = useRef();

  useEffect(() => {
    if (!isSubmitting) {
      formRef.current.reset();
      nameRef.current.focus();
    }
  }, [isSubmitting]);

  return (
    <div className="form-wrapper">
      <h2 className="h3">Create Budget</h2>
      <fetcher.Form method="post" className="grid-sm" ref={formRef}>
        <div className="grid-xs">
          <label htmlFor="newBudget">New Budget</label>
          <input
            type="text"
            name="newBudget"
            id="newBudget"
            placeholder="e.g, Geogries"
            required
            ref={nameRef}
          />
        </div>
        <div className="grid-xs">
          <label htmlFor="newBudgetAmount">Amount</label>
          <input
            type="number"
            step={0.01}
            name="newBudgetAmount"
            id="newBudgetAmount"
            placeholder="e.g, $200"
            required
          />
        </div>
        <input type="hidden" name="_action" value="createBudget" />
        <button className="btn btn--dark" disabled={isSubmitting}>
          {isSubmitting ? (
            <span>Submitting...</span>
          ) : (
            <>
              <span>Create Budget</span>
              <CurrencyDollarIcon width={20} />
            </>
          )}
        </button>
      </fetcher.Form>
    </div>
  );
};

export default AddBudgetForm;
