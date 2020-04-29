<?php

use Apretaste\Request;
use Apretaste\Response;

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
		$response->setCache("year");
		$response->setTemplate("home.ejs");
	}
}
