<?php

use Apretaste\Core;
use Apretaste\Config;
use Apretaste\Person;
use Apretaste\Request;
use Apretaste\Response;
use Apretaste\Tutorial;
use Apretaste\Database;

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
			"province" => (string) $request->person->provinceCode,
			"gender" => $request->person->gender,
			"avatar" => $request->person->avatar,
			"avatarColor" => $request->person->avatarColor,
			"defaultService" => $request->person->defaultService
		];

		// get the content
		$content = [
			"person" => $person,
			'defaultServiceList' => Core::$defaultServices
		];

		// send data to the view
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
		// get the tutorial as object of booleans
		$tutorial = Tutorial::get($request->person->id);

		// get link to the home service
		$isVersion7 = $request->input->osType == 'web' || $request->input->appVersion >= 7;
		$homeService = $isVersion7 ? 'INICIO' : 'SERVICIOS';

		// get the content
		$content = [
			"tutorialId" => Config::pick('general')['tutorial_id'],
			"tutorial" => $tutorial,
			"osType" => $request->input->osType,
			"method" => $request->input->method,
			"homeService" => $homeService
		];

		// send data to the view
		$response->setCache('year');
		$response->setTemplate("tutorial.ejs", $content);
	}
}
