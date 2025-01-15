# db/seeds.rb

# Criar listas iniciais
list1 = List.create!(title: "Tarefas Domésticas", completed: false, priority: "Alta", category: "Casa", item_count: 4)
list2 = List.create!(title: "Projetos de Trabalho", completed: false, priority: "Média", category: "Trabalho", item_count: 3)
list3 = List.create!(title: "Lista de Compras", completed: false, priority: "Urgente", category: "Compras", item_count: 5)
list4 = List.create!(title: "Planejamento de Viagem", completed: false, priority: "Média", category: "Lazer", item_count: 2)

# Criar itens associados às listas
# Lista 1: Tarefas Domésticas
Item.create!(title: "Lavar a louça", completed: false, due_date: "2025-01-20", list_id: list1.id)
Item.create!(title: "Arrumar os quartos", completed: true, due_date: "2025-01-15", list_id: list1.id)
Item.create!(title: "Passar roupa", completed: false, due_date: "2025-01-22", list_id: list1.id)
Item.create!(title: "Organizar o armário", completed: false, due_date: "2025-01-25", list_id: list1.id)

# Lista 2: Projetos de Trabalho
Item.create!(title: "Enviar relatório semanal", completed: false, due_date: "2025-01-18", list_id: list2.id)
Item.create!(title: "Reunião com a equipe", completed: false, due_date: "2025-01-19", list_id: list2.id)
Item.create!(title: "Revisar proposta para cliente", completed: true, due_date: "2025-01-14", list_id: list2.id)

# Lista 3: Lista de Compras
Item.create!(title: "Comprar leite", completed: false, due_date: nil, list_id: list3.id)
Item.create!(title: "Comprar pão", completed: false, due_date: nil, list_id: list3.id)
Item.create!(title: "Comprar frutas", completed: true, due_date: nil, list_id: list3.id)
Item.create!(title: "Comprar carne", completed: false, due_date: nil, list_id: list3.id)
Item.create!(title: "Comprar papel higiênico", completed: false, due_date: nil, list_id: list3.id)

# Lista 4: Planejamento de Viagem
Item.create!(title: "Reservar hotel", completed: true, due_date: "2025-02-01", list_id: list4.id)
Item.create!(title: "Comprar passagens aéreas", completed: false, due_date: "2025-02-05", list_id: list4.id)
