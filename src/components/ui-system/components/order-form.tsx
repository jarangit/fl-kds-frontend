"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { NumericKeypad } from "./numbericKeypad";
import Input from "./atoms/input";
import TabItem from "./atoms/tab-item";

interface OrderFormProps {
  orderType: "TOGO" | "DINEIN";
  label: string;
  buttonColor: string;
  _onSubmit: ({
    orderType,
    orderNumber,
    isWaitingInStore,
  }: {
    orderType: string;
    orderNumber: string;
    isWaitingInStore: boolean;
  }) => void;
}

export function OrderForm({ label, _onSubmit, orderType }: OrderFormProps) {
  const [number, setNumber] = useState("");
  const [isWaitingInStore, setIsWaitingInStore] = useState(false);

  const handleSubmit = () => {
    _onSubmit({
      orderType: orderType,
      orderNumber: number,
      isWaitingInStore: isWaitingInStore,
    });
    setNumber("");
    setIsWaitingInStore(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit();
  };

  const onTapToggleIsWaiting = (value: boolean) => {
    setIsWaitingInStore(value);
  };

  useEffect(() => {
    if (orderType) {
      console.log(orderType);
    }
  }, []);

  return (
    <form
      onSubmit={handleFormSubmit}
      className=" bg-white p-6 rounded-lg lg:min-w-[300px]"
    >
      <div className="flex flex-col space-y-4">
        <label htmlFor="orderNumber" className="text-xl font-semibold">
          {label}
        </label>
        <Input
          value={number}
          placeholder="Enter number"
          onChange={(e) => setNumber(e.target.value)}
        />
        {/* waiting */}
          {orderType == "DINEIN" ? (
            <>
              <div className="border flex items-center border-black rounded-lg overflow-hidden cursor-pointer">
                <TabItem
                  title={"Table"}
                  className="w-full rounded-none !p-3"
                  active={!isWaitingInStore}
                  onClick={() => onTapToggleIsWaiting(false)}
                />
                <TabItem
                  title={"@ToGo"}
                  className="w-full rounded-none !p-3"
                  active={isWaitingInStore}
                  onClick={() => onTapToggleIsWaiting(true)}
                />
              </div>
            </>
          ) : (
            ""
          )}
        <div className="flex flex-col space-y-4">
          <NumericKeypad
            value={number}
            onChange={setNumber}
            onSubmit={handleSubmit}
            maxLength={4}
          />
        </div>
      </div>
    </form>
  );
}
