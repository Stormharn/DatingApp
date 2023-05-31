using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class MessagesController : BaseAPIController
    {
        private readonly IMessageRepository _messageRepo;
        private readonly IMapper _mapper;
        private readonly IUserRepository _userRepo;
        public MessagesController(IUserRepository userRepo, IMessageRepository messageRepo, IMapper mapper)
        {   
            _userRepo = userRepo;
            _mapper = mapper;
            _messageRepo = messageRepo;
            
        }

        [HttpPost]
        public async Task<ActionResult<MessageDto>> CreateMessage(CreateMessageDto createMessageDto)
        {
            var username = User.GetUsername();

            if (username == createMessageDto.RecipientUsername.ToLower()) return BadRequest("You cannot send messages to yourself");

            var sender = await _userRepo.GetUserByUsernameAsync(username);
            var recipient = await _userRepo.GetUserByUsernameAsync(createMessageDto.RecipientUsername);

            if (recipient == null) return NotFound();

            var message = new Message
            {
                Sender = sender,
                Recipient = recipient,
                SenderUsername = sender.UserName,
                RecipientUsername = recipient.UserName,
                Content = createMessageDto.Content
            };

            _messageRepo.AddMessage(message);

            if (await _messageRepo.SaveAllAsync()) return Ok(_mapper.Map<MessageDto>(message));

            return BadRequest("Failed to send message");
        }

        [HttpGet]
        public async Task<ActionResult<PagedList<MessageDto>>> GetMessagesForUser([FromQuery] MessageParams messageParams)
        {
            messageParams.Username = User.GetUsername();

            var messages = await _messageRepo.GetMessagesForUser(messageParams);

            Response.AddPaginationHeader(new PaginationHeader(messages.CurrentPage, messages.PageSize, messages.TotalCount, messages.TotalPages));

            return messages;
        }

        [HttpGet("thread/{username}")]
        public async Task<ActionResult<IEnumerable<MessageDto>>> GetMessageThread(string username)
        {
            var currentUsername = User.GetUsername();

            return Ok(await _messageRepo.GetMessageThread(currentUsername, username));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteMessage(int id)
        {
            var username = User.GetUsername();

            var message = await _messageRepo.GetMessage(id);

            if (message.SenderUsername != username && message.RecipientUsername != username) return Unauthorized();

            if ((message.SenderUsername == username && message.SenderDeleted) || (message.RecipientUsername == username && message.RecipientDeleted)) return BadRequest("You have already deleted this message");

            if (message.SenderUsername == username)
            {
                message.SenderDeleted = true;
            }
            else
            {
                message.RecipientDeleted = true;
            }

            if (message.SenderDeleted && message.RecipientDeleted)
            {
                _messageRepo.DeleteMessage(message);
            }

            if (await _messageRepo.SaveAllAsync()) return Ok();

            return BadRequest("Problem deleting the message");
        }
    }
}