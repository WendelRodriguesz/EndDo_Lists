export const groupAndSort = <T>(
    data: T[],
    groupBy?: keyof T,
    sortBy?: keyof T,
    sortOrder: "asc" | "desc" = "asc"
  ): Record<string, T[]> => {
    // Pesos para prioridades (caso aplicável)
    const priorityWeights: Record<string, number> = {
      Baixa: 1,
      Média: 2,
      Importante: 3,
      Urgente: 4,
    };
  
    const sortData = (array: T[], key: keyof T) => {
      return [...array].sort((a, b) => {
        const rawValA = a[key];
        const rawValB = b[key];
  
        // Variáveis locais para valores tratados
        let treatedValA: unknown = rawValA;
        let treatedValB: unknown = rawValB;
  
        // Tratamento para prioridades
        if (key === "priority" && typeof rawValA === "string" && typeof rawValB === "string") {
          treatedValA = priorityWeights[rawValA] || 0;
          treatedValB = priorityWeights[rawValB] || 0;
        }
  
        // Tratamento para datas
        if (typeof rawValA === "string" && Date.parse(rawValA)) {
          treatedValA = new Date(rawValA).getTime();
          treatedValB = new Date(rawValB as string).getTime();
        }
  
        // Comparação padrão
        if (sortOrder === "asc") return (treatedValA as number) > (treatedValB as number) ? 1 : -1;
        return (treatedValA as number) < (treatedValB as number) ? 1 : -1;
      });
    };
  
    const sortedData = sortBy ? sortData(data, sortBy) : data;
  
    if (!groupBy) return { Todos: sortedData };
  
    return sortedData.reduce((acc: Record<string, T[]>, item) => {
      const groupKey = item[groupBy] ? String(item[groupBy]) : "Outros";
      if (!acc[groupKey]) acc[groupKey] = [];
      acc[groupKey].push(item);
      return acc;
    }, {});
  };
  