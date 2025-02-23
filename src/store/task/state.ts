export const initialTaskState = (): TaskState=>(
    {
      items: [],
      taskModalTable: false,
      selectedItemIndex: -1,
      searchText: '',
      filter: {
        task: {
          filter: {
            page: 0,
            limit: 50,
            filter: [],
            orderBy: [],
          },
          data: {
            meta: {
              total: 0,
            },
            data: [],
          },
        },
      },
    }
  )