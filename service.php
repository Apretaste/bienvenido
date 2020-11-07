<?php

use Apretaste\Request;
use Apretaste\Response;
use Framework\Config;

class Service
{
	/**
	 * Main entry point
	 *
	 * @param Request
	 * @param Response
	 */
	public function _main(Request $request, Response $response)
	{
		// check if the profile has not been updated
		$profileNotUpdated = empty($request->person->lastUpdateDate);

		// take the wizard or tutorial
		if($profileNotUpdated) {
			return $this->_wizard($request, $response);
		} else {
			return $this->_tutorial($request, $response);
		}
	}

	/**
	 * A wizard to help you configure your profile
	 *
	 * @param Request
	 * @param Response
	 */
	public function _wizard(Request $request, Response $response)
	{
		// create a subset of the person object
		$person = [
			"username" => $request->person->username,
			"province" => $request->person->gender,
			"gender" => $request->person->gender,
			"avatar" => $request->person->avatar,
			"avatarColor" => $request->person->avatarColor
		];

		// check if is version 7
		$isVersion7 = $request->input->osType == 'web' || $request->input->appVersion >= 7;

		// get the content
		$content = [
			"person" => $person,
			"start" => $isVersion7 ? 'INICIO' : 'SERVICIOS'
		];

		// send data to the view
		$response->setCache();
		$response->setTemplate("wizard.ejs", $content);
	}

	/**
	 * A list of stuff to-do in the app
	 *
	 * @param Request
	 * @param Response
	 */
	public function _tutorial(Request $request, Response $response)
	{
		// get the content
		$tutorialId = Config::pick('general')['tutorial_id'];

		// send data to the view
		$response->setCache('year');
		$response->setTemplate("tutorial.ejs", ["tutorialId" => $tutorialId]);
	}
}
