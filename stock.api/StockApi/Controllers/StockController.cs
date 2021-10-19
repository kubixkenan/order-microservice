using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StockApi.Data;
using StockApi.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StockApi.Controllers
{
    [Authorize(AuthenticationSchemes = "Bearer")]
    [Route("api/[controller]/[action]")]
    [ApiController]    
    public class StockController : ControllerBase
    {
        protected readonly IStockService _service;

        public StockController(IStockService service)
        {
            _service = service;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] StockModel model)
        {
            var result = await _service.Create(model);
            return Ok(result);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _service.GetAll();
            return Ok(result);
        }

        [HttpGet]
        public async Task<IActionResult> Get(Guid Id)
        {
            var result = await _service.Get(Id);
            return Ok(result);
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] StockModel model)
        {
            var result = await _service.Update(model);
            return Ok(result);
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(Guid Id)
        {
            var result = await _service.Delete(Id);
            return Ok(result);
        }
    }
}
