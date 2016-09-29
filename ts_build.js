const fs = require("fs");
const process = require('child_process');
const minifier = require('minifier');

compile();
attach_header();
remove_dynamics();
minify();

function compile()
{
	try
	{
		process.execSync("tsc -p ts/tsconfig.json");
	}
	catch (exception) {}
}

function attach_header()
{
	const TITLE_FILE = "./ts/src/typings/samchon-framework/samchon-framework.d.ts";
	const HEADER_FILE = "./lib/ts/samchon-framework.d.ts";

	var text = fs.readFileSync(TITLE_FILE, "utf8");
	text += fs.readFileSync(HEADER_FILE, "utf8");

	fs.writeFileSync(HEADER_FILE, text, "utf8");
}

function remove_dynamics()
{
	const JS_FILE = "./lib/ts/samchon-framework.js";
	const REPLACES = 
		[
			//--------
			// FILE MODULE
			//--------
			'file_', // FileReference.file_

			//--------
			// PROTOCOL MODULE
			//--------
			'_replyData',		// IProtocol._replyData
			'start_time_',			// InvokeHistory.start_time_
			'end_time_',			// InvokeHistory.end_time_

			//--------
			// SERVICE MODULE
			//--------
			'erase_user',		// Server.erase_user
			'account_map_',		// Server.account_map_
			'session_id_',		// User.session_id_
			'sequence_',		// User.sequence_
			'createClient',		// User.createClient
			'no_',				// Client.no_
			
			//--------
			// PARALLEL SYSTEM MODULE
			//--------
			'history_sequence_',	// ParallelSystemArray.history_sequence_
			'_Complete_history',	// ParallelSystemArray._Complete_history

			'progress_list_',		// ParallelSystem.progress_list_
			'history_list_',		// ParallelSystem.history_list_
			'exclude_',				// ParallelSystem.exclude_
			'send_piece_data',		// ParallelSystem.send_piece_dat

			'complete_history',		// MediatorSystem.complete_history
			'first',				// PRInokeHistory.first
			'last',					// PRInvokeHistory.last

			//--------
			// DISTRIBUTED SYSTEM MODULE
			//--------
			'compute_average_elapsed_time'	// (DistributedSystem | DistributedSystemRole).compute_average_elapsed_time
		];

	var text = fs.readFileSync(JS_FILE, "utf8");
	for (var i = 0; i < REPLACES.length; i++)
		text = text.split('["' + REPLACES[i] + '"]').join('.' + REPLACES[i]);

	fs.writeFileSync(JS_FILE, text, "utf8");
}

function minify()
{
	minifier.minify("lib/ts/samchon-framework.js");
}