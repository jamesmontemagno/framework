#pragma once

#include <samchon/library/Event.hpp>

#include <string>

namespace samchon
{
namespace library
{
	/**
	 * @brief Event representing an error
	 *
	 * @details
	 * \par [Inherited]
	 *		@copydetails library::Event
	 */
	class ErrorEvent
		: public Event
	{
	private:
		typedef Event super;

		enum : int
		{
			ACTIVATE = 1,
			COMPLETE = 2,
			REMOVED = -1
		};

	protected:
		/**
		 * @brief Error message
		 */
		std::string message;

	public:
		enum : int
		{
			ERROR = 0
		};

		/**
		 * @brief Construct from source and error-id
		 * @details The event object owns its source and type
		 *
		 * @param source Source of the event; who made the event
		 * @param id An error-id
		 */
		ErrorEvent(EventDispatcher *source, const std::string &message)
			: super(source, ErrorEvent::ERROR)
		{
			this->message = message;
		};
		virtual ~ErrorEvent() = default;

		/**
		 * @brief Get error-id
		 */
		auto getMessage() const -> std::string
		{
			return message;
		};
	};
};
};