using AutoMapper;
using HealthcareSystem.Backend.Repositories.IInsuarancePolicyRepository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using HealthcareSystem.Backend.Models.DTO;
using Azure;
using System.Net;

namespace HealthcareSystem.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InsuarancePolicy : ControllerBase
    {
        private readonly IInsuarancePolicyRepository _dbIP;
        private readonly IMapper _mapper;


        public InsuarancePolicy(IInsuarancePolicyRepository dbIP, IMapper mapper)
        {
            _dbIP = dbIP;
            _mapper = mapper;
        }
        [HttpGet]

        public async Task<ActionResult<IEnumerable<InsuarancePolicyDTO>>> GetAllPolicy()
        {
            try
            {
                var List = await _dbIP.GetAllAsync();
                var mapper_data = _mapper.Map<List<InsuarancePolicyDTO>>(List);
                return Ok(mapper_data);
            }
            catch (Exception e){
                return BadRequest(e.Message);
            }
        }

        [HttpGet("{id:int}")]

        public async Task<ActionResult<InsuarancePolicyDTO>> GetOnePolicy(int id)
        {
            try
            {
                if (id == 0)
                {
                    return BadRequest();
                }
                var policy = await _dbIP.GetAsync(u => u.PolicyID == id);
                if (policy == null)
                {
                    return NotFound();
                }
                var api = _mapper.Map<InsuarancePolicyDTO>(policy);
                return Ok(api);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
