import React, { createContext, ReactNode, useContext, useState } from 'react';
import { OrderHistoryData } from '../data/OrderHistorydata';

const OrderQueueContext = createContext<OrderQueueContextType | undefined>(undefined);

export const OrderQueueProvider = ({ children }: { children: ReactNode }) => {
    const [orderQueueItem , setOrderQueueItem] = useState<OrderHistory[]>(OrderHistoryData);
    return (
        <OrderQueueContext.Provider value={{ orderQueueItem , setOrderQueueItem }}>
            {children}
        </OrderQueueContext.Provider>
    );
};

export const useOrderQueue = () => {
    const context = useContext(OrderQueueContext);
    if (!context) {     
        throw new Error('useOrderQueue must be used within a OrderQueue Provider');
    }
    return context;
}
