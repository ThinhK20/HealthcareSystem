using AutoMapper;
using HealthcareSystem.Backend.Repositories.IInsuarancePolicyRepository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using HealthcareSystem.Backend.Models.DTO;
using HealthcareSystem.Backend.Models.Entity;
namespace HealthcareSystem.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InsuarancePolicyController : ControllerBase
    {
        private readonly IInsuarancePolicyRepository _dbIP;
        private readonly IMapper _mapper;


        public InsuarancePolicyController(IInsuarancePolicyRepository dbIP, IMapper mapper)
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
        [HttpPost]
        public async Task<ActionResult<InsuarancePolicyCreateDTO>> CreatePolicy([FromBody] InsuarancePolicyCreateDTO data)
        {

            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest();
                }
                if (data == null)
                {
                    return BadRequest();
                }

                var idNew = await _dbIP.GetLength() + 1;

                Models.Entity.InsurancePolicy model = new()
                {
                    PayoutPercentage = data.PayoutPercentage,
                    Description = data.Description,
                    Name = data.Name,
                    MaxRefund = data.MaxRefund
                };
               
                await _dbIP.CreateAsync(model);


                var api = _mapper.Map<InsuarancePolicyCreateDTO>(model);
               
                return Ok(api);
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }
    }
}
