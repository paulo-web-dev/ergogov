<?php

namespace App\Http\Controllers;

trait ReactViewController
{
    protected function reactView(string $page, array $props = [])
    {
        return view('pages.' . $page, [
            'page_script' => $page,
            'props'       => $props,
        ]);
    }

    protected function currentUser(): array
    {
        $u = auth()->user();
        return [
            'id'       => $u->id,
            'name'     => $u->name,
            'email'    => $u->email,
            'initials' => strtoupper(substr($u->name, 0, 1) . (strpos($u->name, ' ') !== false ? substr(strrchr($u->name, ' '), 1, 1) : '')),
            'power'    => $u->power ?? 0,
        ];
    }
}
