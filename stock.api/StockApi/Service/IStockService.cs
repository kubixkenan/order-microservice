using StockApi.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StockApi.Service
{
    public interface IStockService
    {
        Task<StockModel> Create(StockModel model);
        Task<List<StockModel>> GetAll();
        Task<StockModel> Get(Guid Id);
        Task<StockModel> Update(StockModel model);
        Task<bool> Delete(Guid Id);
    }
}
