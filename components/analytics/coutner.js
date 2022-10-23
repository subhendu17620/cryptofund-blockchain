import { useState, useCallback } from 'react';

export default function useCounter() {  const increment = useCallback(() => setCount((x) => x + 1), []);
    return { count, increment };
}
