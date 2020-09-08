<?php

use Apretaste\Request;
use Apretaste\Response;
use Framework\Config;

class Service
{
	/**
	 * Open the welcoming screens
	 *
	 * @param Request
	 * @param Response
	 */
	public function _main(Request $request, Response $response)
	{
		// get the content
		$content = [
			"isNewVersion" => $request->input->osType == 'web' || $request->input->appVersion >= 7,
			"tutorialId" => Config::pick('general')['tutorial_id']
		];

		// send data to the view
		$response->setCache("year");
		$response->setTemplate("home.ejs", $content);
	}
}
