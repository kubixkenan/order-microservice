using StockApi.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StockApi.Service
{
    public class StockService : IStockService
    {
        protected ApplicationDbContext _context;

        public StockService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<StockModel> Create(StockModel model)
        {
            var stock = await _context.AddAsync(model);
            await _context.SaveChangesAsync();
            return stock.Entity;
        }

        public async Task<bool> Delete(Guid Id)
        {
            var item = _context.Set<StockModel>().Where(x => x.Id == Id).FirstOrDefault();
            if(item != null)
            {
                _context.Remove(item);
                await _context.SaveChangesAsync();
            }
            else
            {
                return false;
            }

            return true;
            
        }

        public async Task<StockModel> Get(Guid Id)
        {
            var item = _context.Set<StockModel>().Where(x => x.Id == Id).FirstOrDefault();
            return item;
        }

        public async Task<List<StockModel>> GetAll()
        {
            var list = _context.Set<StockModel>().ToList();
            return list;
        }

        public async Task<StockModel> Update(StockModel model)
        {
            var entity = _context.Set<StockModel>();
            var stockEntity = entity.Where(x => x.Id == model.Id).FirstOrDefault();
            if (stockEntity == null)
            {
                throw new Exception("Data not found!");
            }

            stockEntity.Name = model.Name;
            stockEntity.Price = model.Price;
            stockEntity.Quantity = model.Quantity;
            await _context.SaveChangesAsync();

            return stockEntity;
        }
    }
}
